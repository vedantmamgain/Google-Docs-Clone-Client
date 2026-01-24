// Frontend-only document storage using localStorage
const STORAGE_KEY = "documents";

// Helper functions for localStorage
const getDocuments = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return {};
  }
};

const saveDocuments = (documents) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// Generate a unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const state = {
  //This is the variable we wish to load the data into
  document: {},
};
const getters = {
  getResponse: (state) => state.document,
  getDocumentById: () => (id) => {
    const documents = getDocuments();
    return documents[id] || null;
  },
  getAllDocuments: () => {
    return getDocuments();
  },
};
const actions = {
  //Frontend-only: Create document and save to localStorage
  async addDocu({ commit }, { name, content, editableProperty }) {
    try {
      const documents = getDocuments();
      const documentId = generateId();
      const newDocument = {
        _id: documentId,
        name: name,
        content: content || "",
        editableProperty: editableProperty !== undefined ? editableProperty : true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      documents[documentId] = newDocument;
      saveDocuments(documents);

      // Format response to match expected structure
      const responseData = {
        document: {
          status: "sucess",
          document: newDocument,
        },
      };

      commit("addDocument", responseData);
      return responseData;
    } catch (error) {
      console.error("Error creating document:", error);
      commit("addDocument", {
        document: {
          status: "error",
          error: error.message || "Failed to create document.",
        },
      });
      throw error;
    }
  },
  // Load document by ID
  async loadDocument({ commit }, documentId) {
    try {
      const documents = getDocuments();
      const document = documents[documentId];
      
      if (document) {
        commit("addDocument", {
          document: {
            status: "sucess",
            document: document,
          },
        });
        return document;
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      console.error("Error loading document:", error);
      throw error;
    }
  },
  // Update document content
  async updateDocument(context, { documentId, content }) {
    try {
      const documents = getDocuments();
      if (documents[documentId]) {
        documents[documentId].content = content;
        documents[documentId].updatedAt = new Date().toISOString();
        saveDocuments(documents);
        return documents[documentId];
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  },
};
const mutations = {
  //finally changing the state paramenter . We can write complex functions as well but we just dumped the data here in this case
  addDocument: (state, responseData) => (state.document = responseData),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
