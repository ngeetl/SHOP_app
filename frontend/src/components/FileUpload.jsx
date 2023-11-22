import React from 'react'
import Dropzone from 'react-dropzone'

const FileUpload = ({ images, onImageChange }) => {
    
    return (
        <div className='flex gap-4'>

            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section className='min-w-[300px] h-[300px] border flex items-center justify-center'>
                <div {...getRootProps()} className='w-full h-full cursor-pointer flex justify-center items-center'>
                    <input {...getInputProps()} />
                    <p className='text-3xl text-gray-400'>+</p>
                </div>
                </section>
            )}
            </Dropzone>

            <div className='flex flex-grow items-center justify-center h-[300px] border overflow-x-scroll overflow-y-hidden'>
                {images.map(image => (
                    <div key={image}>
                        <img className='min-w-[300px] h-[300px]'
                            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                            alt={image}/>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FileUpload;
