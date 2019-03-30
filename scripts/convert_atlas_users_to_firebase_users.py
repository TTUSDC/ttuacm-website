import argparse
import re
import base64
from pathlib import Path
from typing import Dict
import json

# ************************ PARSE ARGS *

parser = argparse.ArgumentParser(description="Converts a MongoDB Atlas json file to a Firebase Auth json file ready to be imported")
parser.add_argument('-i', metavar='--input-name', type=str, nargs=1, 
                    help='a string (with quotes) representing the filename of the input file', required=True)

parser.add_argument('-o', metavar='--output-name', type=str, nargs=1, 
                    help='a string (with quotes) representing the filename of the output file', required=True)

args = parser.parse_args()

assert len(args.i) == 1
assert len(args.o) == 1

cwd = Path.cwd()

fname = cwd / Path(args.i[0])
outname = cwd / Path(args.o[0])

if not fname.exists():
    raise FileNotFoundError(f'{fname} was not found')
elif fname.suffix != '.json':
    raise Exception(f'{fname} does not end in .json')

if outname.exists():
    raise FileExistsError(f'{outname} already exits')


# ************************ OPEN AND CONVERT *

lines_of_interest = []
emails_set = set()

with open(fname, "r") as f:
    for line in f.readlines():
        line_dict = json.loads(line)
        lines_of_interest.append(line_dict)

def convert(d: Dict[str,str]) -> Dict[str,str]:
    a_firebase_user = {}
    a_firebase_user["localId"] = d["_id"]["$oid"].strip()
    a_firebase_user["email"] = d["email"].strip()
    a_firebase_user["emailVerified"] = bool(d["verified"])
    a_firebase_user["displayName"] = d.get("firstName", "").strip() + " " + d.get("lastName","").strip()
    a_firebase_user["passwordHash"] = base64.b64encode(d["password"].strip().encode()).decode()

    return a_firebase_user

firebase_users = {"users":[]}
users_list = []

for i,mongo_user in enumerate(lines_of_interest):
    email = mongo_user['email']
    # It the user has a valid email, and their email has not been already processed, then convert
    if re.fullmatch(r"[^@]+@[^@]+\.[^@]+", email) and email not in emails_set and bool(mongo_user["verified"]):
        emails_set.add(email)
        converted = convert(mongo_user)
        users_list.append(converted)


print(f'{len(users_list)} fields were processed')

firebase_users["users"] = users_list

assert len(emails_set) == len(users_list)

# ************************ OPEN AND DUMP (lol) *

with open(outname,'w') as fw:
    json.dump(firebase_users, fw)
