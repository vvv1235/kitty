import { createClient } from '@/lib/supabase/client';

/**
 * Uploads multiple pet photos to Supabase Storage and updates the pet record
 * with the resulting public URLs.
 *
 * Esta implementação roda 100% no cliente, usando o Supabase browser client.
 * Antes, o código chamava Server Actions diretamente de um componente client,
 * o que quebrava o upload das fotos.
 */
export async function uploadPetPhotos(
  files: File[],
  petId: string
): Promise<{ success: boolean; urls?: string[]; error?: string }> {
  if (!files || files.length === 0) {
    return { success: true, urls: [] }; // Nenhuma foto para enviar
  }

  const supabase = createClient();
  const urls: string[] = [];

  for (const file of files) {
    try {
      // Nome único por pet e timestamp
      const uniqueFileName = `pet_${petId}/${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}_${file.name}`;

      // Upload direto do File (browser) para o bucket "pet-photos"
      const { error: uploadError } = await supabase.storage
        .from('pet-photos')
        .upload(uniqueFileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Error uploading photo to storage:', uploadError);
        return {
          success: false,
          error: `Failed to upload photo to storage: ${uploadError.message}`,
        };
      }

      // Gerar URL pública
      const { data: publicData } = supabase.storage
        .from('pet-photos')
        .getPublicUrl(uniqueFileName);

      if (!publicData?.publicUrl) {
        return {
          success: false,
          error: 'Could not generate public URL for uploaded photo',
        };
      }

      urls.push(publicData.publicUrl);
    } catch (error: any) {
      console.error(`Error uploading file ${file.name}:`, error);
      return {
        success: false,
        error: `Failed to upload file ${file.name}: ${error.message}`,
      };
    }
  }

  // Atualizar o registro do pet com o array de URLs das fotos
  const { error: updateError } = await supabase
    .from('pets')
    .update({ photos: urls })
    .eq('id', petId);

  if (updateError) {
    console.error('Error updating pet with photos:', updateError);
    return {
      success: false,
      error: 'Failed to update pet record with photo URLs',
    };
  }

  return { success: true, urls };
}
