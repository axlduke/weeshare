// import { IncomingForm } from 'formidable';
// import fs from 'fs';
// import path from 'path';

// const uploadDir = path.resolve('./public/uploads');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default function handler(req, res) {
//   const form = new IncomingForm({ uploadDir, keepExtensions: true });

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({ message: 'File upload failed', error: err });
//     }

//     if (!files.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const file = files.file[0];
//     const filePath = file.filepath;
//     const fileName = file.newFilename;
//     const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${fileName}`;


//     return res.status(200).json({ message: 'File uploaded successfully', fileUrl });
//   });
// }

import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Directory to save uploaded files
const uploadDir = path.resolve('./public/uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration to prevent Next.js from parsing the body automatically
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm({
    uploadDir, // Directory to store uploaded files
    keepExtensions: true, // Keep the file extension
    maxFileSize: 20 * 1024 * 1024 * 1024, // Set file size limit to 20GB
    multiples: false, // Only accept single file
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'File upload failed', error: err });
    }

    if (!files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = files.file[0];
    const filePath = file.filepath
    const fileName = file.newFilename

    // Debugging logs
    console.log('Files:', files);
    console.log('File Path:', filePath);
    console.log('File Name:', fileName);

    // Handle invalid file path
    if (!filePath || typeof filePath !== 'string') {
      return res.status(500).json({ message: 'Invalid file path received' });
    }

    // Ensure correct path format and escape backslashes
    const normalizedFilePath = path.normalize(filePath);
    console.log(`Normalized File Path: ${String.raw`${normalizedFilePath}`}`);

    // Construct the file URL
    const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${fileName}`;
    console.log('Generated fileUrl:', fileUrl);

    return res.status(200).json({ message: 'File uploaded successfully', fileUrl });
  });
}
