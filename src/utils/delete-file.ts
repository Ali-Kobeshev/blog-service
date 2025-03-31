import fs from "fs";

export function deleteFile(filePath: string) {
   fs.unlink(filePath, (err) => {
      if (err) {
         console.error("Ошибка при удалении файла:", err);
      } else {
         console.log("Файл удалён, как и договаривались!");
      }
   });
}
