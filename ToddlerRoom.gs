function createBulkToddlerRoomPDFs() {
const docFile = DriveApp.getFileById("1FpFq9SDIs7o4ASYwnrWMp66gZZawaspuZAk8EJ_ZDOs");
const tempFolder = DriveApp.getFolderById("1NFjSkiJPl9ocaZtrf2LnZrxB08Nx-3Gi");
const pdfFolder = DriveApp.getFolderById("1FRbaikb4qGc_4MmcSphbrkis7CaTxMT7");
const currentSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Toddler Room");

const data = currentSheet.getRange(5, 1, currentSheet.getLastRow()-4, 17).getDisplayValues();
const getDate = currentSheet.getRange(1, 4).getDisplayValue();

let errors = [];
data.forEach(row => {
  try{
  createPDF(row[0], row[1], row[10], row[13], row[14], row[16], getDate, "LHN Invoice:" + " " + row[0] + " " + row[1], docFile, tempFolder, pdfFolder);
  errors.push([""])
  } catch( err) {
    errors.push(["Failed"]);
  }
});

currentSheet.getRange(5, 18, currentSheet.getLastRow()-4, 1).setValues(errors);

}

function createPDF(childFirstName, childLastName, totalDays, rate, daysTotal, total, date, pdfName, docFile, tempFolder, pdfFolder) {

// doc id 1FpFq9SDIs7o4ASYwnrWMp66gZZawaspuZAk8EJ_ZDOs
// temp folder 1NFjSkiJPl9ocaZtrf2LnZrxB08Nx-3Gi
// pdf folder 1sLiKSo8O1Y3qGZANjWKQWb_qiunvcEli

const tempFile = docFile.makeCopy(tempFolder);
const tempDocFile = DocumentApp.openById(tempFile.getId());
const body = tempDocFile.getBody();
body.replaceText("{childfirstname}", childFirstName);
body.replaceText("{childlastname}", childLastName);
body.replaceText("{totaldays}", totalDays);
body.replaceText("{rate}", rate);
body.replaceText("{daystotal}", daysTotal);
body.replaceText("{total}", total);
body.replaceText("{date}", date)
tempDocFile.saveAndClose();
const pdfContentBlob = tempFile.getAs(MimeType.PDF);
pdfFolder.createFile(pdfContentBlob).setName(pdfName);
tempFile.setTrashed(true);
}

