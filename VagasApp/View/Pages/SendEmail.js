import RNSmtpMailer from "react-native-smtp-mailer";
 
RNSmtpMailer.sendMail({
  mailhost: "smtp.gmail.com",
  port: "465",
  ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
  username: "dreyerpaulo89@gmail.com",
  password: "pyangyang",
  from: "dreyerpaulo89@gmail.com",
  recipients: "dreyerpaulo89@gmail.com",
  subject: "Teste",
  htmlBody: "<h1>header</h1><p>Olá Mundo!</p>",
  attachmentPaths: [
    RNFS.ExternalDirectoryPath + "/image.jpg",
    RNFS.DocumentDirectoryPath + "/test.txt",
    RNFS.DocumentDirectoryPath + "/test2.csv",
    RNFS.DocumentDirectoryPath + "/pdfFile.pdf",
    RNFS.DocumentDirectoryPath + "/zipFile.zip",
    RNFS.DocumentDirectoryPath + "/image.png"
  ],
  attachmentNames: [
    "image.jpg",
    "firstFile.txt",
    "secondFile.csv",
    "pdfFile.pdf",
    "zipExample.zip",
    "pngImage.png"
  ], //only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[]
  attachmentTypes: ["img", "txt", "csv", "pdf", "zip", "img"] //needed for android, in ios-only application, leave it empty: attachmentTypes:[]. Generally every img(either jpg, png, jpeg or whatever) file should have "img", and every other file should have its corresponding type.
})
  .then(success => console.log(success))
  .catch(err => console.log(err));