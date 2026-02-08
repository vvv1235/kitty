'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadPetPhoto(fileBuffer: Buffer, fileName: string, petId: string): Promise<UploadResult> {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  try {
    // Generate unique file name
    const uniqueFileName = `pet_${petId}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}_${fileName}`
    
    const { data, error } = await supabase.storage
      .from('pet-photos')
      .upload(uniqueFileName, fileBuffer, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading photo to storage:', error)
      return {
        success: false,
        error: `Failed to upload photo to storage: ${error.message}`
      }
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('pet-photos')
      .getPublicUrl(uniqueFileName)

    if (!publicData?.publicUrl) {
      return {
        success: false,
        error: 'Could not generate public URL for uploaded photo'
      }
    }

    return {
      success: true,
      url: publicData.publicUrl
    }
  } catch (error: any) {
    console.error('Unexpected error during photo upload:', error)
    return {
      success: false,
      error: `Unexpected error during upload: ${error.message}`
    }
  }
}

export async function updatePetWithPhotos(petId: string, photoUrls: string[]): Promise<boolean> {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  try {
    const { error } = await supabase
      .from('pets')
      .update({ photos: photoUrls })
      .eq('id', petId)

    if (error) {
      console.error('Error updating pet with photos:', error)
      return false
    }

    // Revalidate the pet detail page
    revalidatePath(`/pets/${petId}`)
    revalidatePath('/pets')
    revalidatePath('/dashboard/my-pets')

    return true
  } catch (error: any) {
    console.error('Unexpected error during pet update:', error)
    return false
  }
}