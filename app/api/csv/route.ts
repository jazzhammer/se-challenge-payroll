import {NextRequest, NextResponse} from "next/server"
import processFormDataParts from "@/app/api/csv/processFormDataParts";
import saveTimeReportFile from "@/app/api/csv/saveTimeReportFile";

/**
 * saves file:
 *    rejects file of previously saved id
 * saves file rows.
 *
 * @param request
 * @param response
 * @constructor
 */
export async function POST(request: NextRequest) {
  try {
    const filepath = await saveTimeReportFile(request);

    // TODO: when next13 requests.formData is fixed, use it.
    // TODO: for now, use custom parser for request body blob:
    await processFormDataParts(filepath);

    return NextResponse.json({
      message: `success: file uploaded ${filepath.substring(filepath.lastIndexOf("/") + 1)}`
    }, {
      status: 200
    });

  } catch(e: any) {
    if (e.message.indexOf("already exists") >= 0) {
      return NextResponse.json({
        message: e.message
      }, {
        status: 400
      });
    } else {
      throw e;
    }
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "csv.GET"
  }, {
    status: 200
  });
}


