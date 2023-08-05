# e2e/api/csv
import json
import os

import requests

from builtins import print, open

from __tests__.e2e.api.endpoint import \
    ENDPOINT_RESEED, \
    ENDPOINT_POST_CSV, ENDPOINT_GET_REPORT_ALL

csv_filename = "time-report-42.csv"
expected_report_filename = "time-report-42.json"

from __tests__.e2e.api.url.url_up import urlUp
print(f"test_post")
if not urlUp(ENDPOINT_RESEED):
    print("unable to seed for test {0}:  inaccessible. is the endpoint up ?".format(ENDPOINT_RESEED))
else:
    response = requests.post(ENDPOINT_RESEED)
    assert response.status_code == 200

    if not urlUp(ENDPOINT_POST_CSV):
        print("unable to test {0}:  inaccessible. is the endpoint up ?".format(ENDPOINT_POST_CSV))
    else:
        headers = {
            "Content-Type": "text/csv; charset=utf-8",
            "filename": csv_filename
        }
        sub = '' if os.getcwd().find('__tests__/e2e/api/csv') >= 0 else '__tests__/e2e/api/csv/'
        dir = '{0}/{1}'.format(os.getcwd(), sub)

        csv_source = '{0}{1}'.format(dir, csv_filename)
        assert csv_source == '/Users/jazzhammer/Documents/workspace_2013/wavepay/__tests__/e2e/api/csv/time-report-42.csv'

        report_source = '{0}{1}'.format(dir, expected_report_filename)
        assert report_source == '/Users/jazzhammer/Documents/workspace_2013/wavepay/__tests__/e2e/api/csv/time-report-42.json'

        report = None

        with open(csv_source) as f:
            response = requests.post(ENDPOINT_POST_CSV, files={"time-report": f}, headers=headers)
            assert response.status_code == 200

            # must not permit re-upload of same file id
            response = requests.post(ENDPOINT_POST_CSV, files={"time-report": f}, headers=headers)
            assert response.status_code == 400

            # output must patch predicted payroll
            response = requests.get(ENDPOINT_GET_REPORT_ALL);
            assert response.status_code == 200
            report = response.json()
        with open(report_source) as expected:
            expected_report = json.load(expected)
            print(expected_report)
            assert report == expected_report