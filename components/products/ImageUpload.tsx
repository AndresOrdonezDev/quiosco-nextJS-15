"use client"
import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

export default function ImageUpload({image}:{image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            uploadPreset="kiosko-AndresDev-Test"
            options={{
                maxFiles: 1
            }}
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    //@ts-ignore
                    setImageUrl(result.info?.secure_url)
                }

            }}
        >
            {({ open }) => (
                <>
                    <div className='space-y-2'>
                        <label className='text-slate-800'>Imagen Producto</label>
                        <div
                            className='relative cursor-pointer hover:opacity-70 
                            transition p-10 text-neutral-600 flex flex-col justify-center 
                            items-center gap-4 border-neutral-300 bg-slate-100'
                            onClick={() => open()}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className='text-lg font-semibold'>Agregar Imagen</p>
                            {imageUrl && <div className='absolute inset-0 w-full h-full'>
                                <Image
                                   fill
                                   style={{objectFit:'contain'}} 
                                   src={imageUrl}
                                   alt='image product'
                                />
                            </div>}
                        </div>
                    </div>
                    {image && !imageUrl &&(
                        <div className='space-y-2'>
                            <label > Imagen Actual:</label>
                            <div className='relative w-64 h-64 mx-auto'>
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt='imagen producto'
                                />
                            </div>
                        </div>
                    )}
                    <input 
                        type="hidden"
                        name='image'
                        defaultValue={imageUrl ? imageUrl : image}
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
