// import { useRouter } from 'react'
// import { NextApiRequest, NextApiResponse } from 'next'
// import path from 'path'

// const download = () => {
//     const { id } = useRouter().query

//     const handleDownload = async () => {
//         const res = await fetch(`/api/download/${id}`)
//         const blob = await res.blob()
//         const url = URL.createObjectURL(blob)
//         const a = document.createElement('a')
//         const fileName = fileUrl.split('/').pop()
//         const fileExtension = path.extname(fileName)
//         a.href = url
//         a.download = `${id}${fileExtension}`
//         a.click()
        
//     }

//     return (
//         <div>download</div>
//     )
// }

// export default download

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const fileId = req.params.fileId;
    const filePath = path.resolve(`./public/uploads/${fileId}`);
    const fileName = fileId;

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
}