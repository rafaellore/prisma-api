import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { FileDTO } from './dto/upload.dto';

@Injectable()
export class UploadService {
  async upload(file: FileDTO) {
    const supabaseURL = process.env.SUPABASE_URL || '';
    const supabaseKEY = process.env.SUPABASE_KEY || '';

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.storage
      .from('cats-images')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from('cats-images')
      .getPublicUrl(file.originalname);

    return {
      path: data.path,
      url: publicUrlData.publicUrl,
    };
  }
}
