from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pdfminer3.layout import LAParams, LTTextBox
from pdfminer3.pdfpage import PDFPage
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.converter import TextConverter

from pyresparser import ResumeParser

import spacy
spacy.load('en_core_web_sm')

import os
import io

app = FastAPI()

origins = [
    "http://localhost:4000",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
  file_path = os.path.join("uploads", file.filename)
  with open(file_path, "wb") as f:
    f.write(await file.read())

  result = analyze_resume(file_path);

  return {"message": result}


def analyze_resume(file):
  data = ResumeParser(file).get_extracted_data()


  if not data:
    return {
      "statusCode": 400,
      "message": "File cannot be parsed"
    }

  ds_keyword = ['tensorflow', 'keras', 'pytorch', 'machine learning', 'deep learning', 'flask',
        'streamlit']
  web_keyword = ['react', 'django', 'node js', 'react js', 'php', 'laravel', 'magento', 'wordpress',
          'javascript', 'angular js', 'c#', 'flask']
  android_keyword = ['android', 'android development', 'flutter', 'kotlin', 'xml', 'kivy']
  ios_keyword = ['ios', 'ios development', 'swift', 'cocoa', 'cocoa touch', 'xcode']
  uiux_keyword = ['ux', 'adobe xd', 'figma', 'zeplin', 'balsamiq', 'ui', 'prototyping', 'wireframes',
          'storyframes', 'adobe photoshop', 'photoshop', 'editing', 'adobe illustrator',
          'illustrator', 'adobe after effects', 'after effects', 'adobe premier pro',
          'premier pro', 'adobe indesign', 'indesign', 'wireframe', 'solid', 'grasp',
          'user research', 'user experience']
  business_analyst_keyword = ['business analyst', 'business analysis', 'business analytics']
  

  recommended_skills = []
  detected_industry = ''
  ## Courses recommendation
  for i in data['skills']:
  ## Data science recommendation
    if i.lower() in ds_keyword:
      detected_industry = 'Data Science'
      recommended_skills = ['Data Visualization', 'Predictive Analysis', 'Statistical Modeling',
                  'Data Mining', 'Clustering & Classification', 'Data Analytics',
                  'Quantitative Analysis', 'Web Scraping', 'ML Algorithms', 'Keras',
                  'Pytorch', 'Probability', 'Scikit-learn', 'Tensorflow', "Flask",
                  'Streamlit']

      break

  ## Web development recommendation
    elif i.lower() in web_keyword:
      detected_industry = 'Web Development'
      recommended_skills = ['React', 'Django', 'Node JS', 'React JS', 'PHP', 'Laravel', 'Magento',
                          'Wordpress', 'Javascript', 'Angular', 'C#', 'Flask', 'HTML', 'CSS', 'SQL', 
                          'MongoDB', 'MySQL', 'PostgreSQL', 'Git', 'Github', 'Heroku', 'AWS', 'Azure',]
      break

  ## Android App Development
    elif i.lower() in android_keyword:
      detected_industry = 'Android Development'
      recommended_skills = ['Android', 'Android development', 'Flutter', 'Kotlin', 'XML', 'Java',
                        'Kivy', 'GIT', 'SDK', 'SQLite', 'JSON', 'REST', 'API', 'Firebase', 'Gradle']
      break

  ## IOS App Development
    elif i.lower() in ios_keyword:
      print(i.lower())
      detected_industry = 'IOS Development'
      recommended_skills = ['IOS', 'IOS Development', 'Swift', 'Cocoa', 'Cocoa Touch', 'Xcode', 'Objective-C', 'SQLite', 'Plist', 'StoreKit', "UI-Kit", 'AV Foundation', 'Auto-Layout', 'Core Data', 'Core Animation', 'Core Graphics', 'Core Location', 'Core Image', 'Core ML', 'Core Text', 'Core Audio', 'Core Video', 'Core Bluetooth', 'Core Telephony', 'Core Spotlight', 'Core Motion', 'Core Foundation', 'Core MIDI', 'Core NFC', 'Core Spotlight']
      break

  ## Ui-UX Recommendation
    elif i.lower() in uiux_keyword:
      detected_industry = 'UI-UX Development'
      recommended_skills = ['UI', 'User Experience', 'Adobe XD', 'Figma', 'Zeplin', 'Balsamiq',
                            'Prototyping', 'Wireframes', 'Storyframes', 'Adobe Photoshop', 'Editing',
                            'Illustrator', 'After Effects', 'Premier Pro', 'Indesign', 'Wireframe',
                            'Solid', 'Grasp', 'User Research']
      break

  resume_skills = data.get('skills', [])
  recommended_skills = [skill for skill in recommended_skills if skill.lower() not in resume_skills]

  data['recommended_skills'] = recommended_skills
  data['detected_industry'] = detected_industry

  return {
    "statusCode": 200,
    "message": "Resume parsed successfully",
    "data": data
  }