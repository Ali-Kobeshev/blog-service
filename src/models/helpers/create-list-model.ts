import { model, Schema } from "mongoose";

export const createListModel = (collectionName: string, fieldName: string) => {
   return model(
      collectionName,
      new Schema({
         [fieldName]: {
            type: [Schema.Types.ObjectId],
            default: [],
            required: true,
         },
      })
   );
};
