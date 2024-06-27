// pages/api/download/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';

const downloadFile = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const file = await getFileFromStorage(id); // implement this function to retrieve the file from storage
    res.setHeader('Content-Disposition', `attachment; filename="${id}.zip"`); // or whatever file extension you want
    res.setHeader('Content-Type', 'application/zip');
    res.send(file);
};

export default downloadFile;