import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";
import fs from "fs";
import {headers} from "next/headers";

/*
* extracts <filename> from request header and all text from request body,
* if ok to save, :
*       saves all text as <filename> in local uploads folder,
*       returns full path Promise<filename>
* */
const saveTimeReportFile = async function(request: NextRequest): Promise<string> {

    const uploaded = await request.text();
    const headersList = headers();
    const filename = headersList.get('filename');
    const fileId = <string>filename?.substring(filename?.indexOf('time-report-') + 'time_report-'.length, filename?.indexOf('.'));

    const prisma = new PrismaClient();
    const already = await prisma.timeReportFile.findFirst({
        where: {fileId: parseInt(fileId)}
    });
    if (already) {
        throw new Error(`timeReportFile of id ${fileId} already exists.`);
    }

    const projectFolder = __dirname.substring(0, __dirname.indexOf('.next'));
    const localFilename = `${projectFolder}uploads/${filename}.txt`;
    fs.writeFile(localFilename, uploaded, () => {});

    await prisma.timeReportFile.create({
        data: {
            fileId: parseInt(<string>fileId)
        }
    });
    await prisma.$disconnect();
    return localFilename;
}

export default saveTimeReportFile;