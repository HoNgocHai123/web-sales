import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const CategoryDataService = {
  getAllCategories: async () => {
    const categoryCollectionRef = collection(db, "Category");
    const data = await getDocs(categoryCollectionRef);
    return data;
  }
};

export default CategoryDataService;
