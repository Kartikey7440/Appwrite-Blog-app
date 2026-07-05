import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form'

function RTE({name, control,label, defaultValue = ""}) {
  return (
    <div className='w-full text-left'> 
    {label && <label className='inline-block mb-1.5 pl-1 text-sm font-semibold text-zinc-300'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
         apiKey="li4d5m674s0bheb8vg8zefuij11ftzr0qyde85fo1t8sr2mm"
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            skin: "oxide-dark",
            content_css: "dark",
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; background-color: #09090b; color: #f4f4f5; }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}

export default RTE
