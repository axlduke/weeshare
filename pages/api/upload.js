import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve('./public/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new IncomingForm({ uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err });
    }

    if (!files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = files.file;
    const filePath = file.path;

    // Debugging log
    console.log('Files:', files);
    console.log('File:', file);

    // Check if filePath is a valid string
    if (!filePath || typeof filePath !== 'string') {
        return res.status(500).json({ message: 'Invalid file path received' });
    }

    const fileName = path.basename(filePath);
    const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${fileName}`;

    return res.status(200).json({ message: 'File uploaded successfully', fileUrl });
    });
}
