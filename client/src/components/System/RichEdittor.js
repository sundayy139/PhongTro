import React from 'react'
import ReactQuill from 'react-quill';
import "katex/dist/katex.min.css";
import 'highlight.js/styles/vs.css';
import katex from "katex";

window.katex = katex;


const RichEdittor = ({ payload, setPayload }) => {
    const handleChange = (value) => {
        setPayload({ ...payload, descHTML: value });
    };

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, false] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            ['blockquote', 'code-block'],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video", "formula"],
            ["clean"],
        ],
        formula: true,
    };

    const formats = [
        "font",
        "header",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        'blockquote',
        'code-block',
        "color",
        "background",
        "script",
        "align",
        "list",
        "bullet",
        "link",
        "image",
        "video",
        "formula",
    ];

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={payload.descHTML}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                placeholder="Write something ..."
            />
        </div>
    )
}

export default RichEdittor