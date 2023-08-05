import { FormDataPart } from '@/app/model/formDataPart';
import * as fs from 'fs';
import util from 'node:util';

const BOUNDARY_START = '--';
const BOUNDARY_END = '--';
const CONTENT_DISPOSITION_START = 'Content-Disposition:';
const DISPOSITION_FILENAME = 'filename';
const DISPOSITION_NAME = 'name';
const DISPOSITION_FORM_DATA = 'form-data';

/**
 * opens file at filepath, parses for parts demarcated by boundary id of format --<boundary id>
 * @param filepath: file to parse for formdata parts
 */
const formDataParts = async (filepath: string): Promise<FormDataPart[]> => {
  const result: FormDataPart[] = [];
  const read = util.promisify(fs.readFile);
  const data = await read(filepath);

  let source = data.toString('utf8')

  let boundary: string | null = null;
  let contentDisposition: string | null = null;
  let filename: string | undefined;
  let blob: string | null = null;

  const lines = source.split('\r\n');

  lines.forEach((line: string) => {
    // while no boundary, hunt for boundary
    if (!boundary) {
      if (line.startsWith(BOUNDARY_START)) {
        boundary = line.substring(BOUNDARY_START.length);
        while (boundary.endsWith(BOUNDARY_END)) {
          boundary = boundary.substring(0, boundary.length - BOUNDARY_END.length);
        }
        // looking for part contents
        contentDisposition = null;
        filename = undefined;
        blob = null;
      }
    } else {
      //while boundary, hunt for content-disposition
      if (!contentDisposition) {
        if (line.startsWith(CONTENT_DISPOSITION_START)) {
          contentDisposition = line.substring(CONTENT_DISPOSITION_START.length).trim();
          const disps = contentDisposition.split(';');
          disps.forEach((disp) => {
            disp = disp.trim();
            if (disp.startsWith(DISPOSITION_FILENAME)) {
              filename = disp.substring(disp.indexOf('"') + 1, disp.length - 1)
            }
          });
        }
      } else {
        //while contentDisposition, hunt for blob: first non blank line
        if (line && line.length > 0) {
          if (line.indexOf(boundary) >= 0) {
            contentDisposition = null;
            filename = undefined;
            blob = null;
          } else {
            blob = line;
          }
        }
      }
    }
    if (blob) {
      // got a full part, reset for next
      result.push({
        filename,
        blob
      });
      boundary = null;
      contentDisposition = null;
      filename = undefined;
      blob = null;
    }
  });
  return result;
}

export default formDataParts;
