import { uploadPetPhoto, updatePetWithPhotos } from '@/actions/upload';

/**
 * Converts a File object to ArrayBuffer then to Buffer
 */
export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Uploads multiple pet photos and updates the pet record
 */
export async function uploadPetPhotos(files: File[], petId: string): Promise<{ success: boolean; urls?: string[]; error?: string }> {
  if (!files || files.length === 0) {
    return { success: true, urls: [] }; // No photos to upload
  }

  const urls: string[] = [];
  
  for (const file of files) {
    try {
      // Convert file to buffer
      const fileBuffer = await fileToBuffer(file);
      
      // Upload to Supabase Storage
      const result = await uploadPetPhoto(fileBuffer, file.name, petId);
      
      if (result.success && result.url) {
        urls.push(result.url);
      } else {
        throw new Error(result.error || 'Unknown error during upload');
      }
    } catch (error: any) {
      console.error(`Error uploading file ${file.name}:`, error);
      return {
        success: false,
        error: `Failed to upload file ${file.name}: ${error.message}`
      };
    }
  }

  // Update the pet record with the photo URLs
  const updateSuccess = await updatePetWithPhotos(petId, urls);
  
  if (!updateSuccess) {
    return {
      success: false,
      error: 'Failed to update pet record with photo URLs'
    };
  }

  return { success: true, urls };
}