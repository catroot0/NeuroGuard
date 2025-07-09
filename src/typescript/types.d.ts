// Represents the raw data structure as stored in the database (e.g., Firebase)
type RawDatabaseData = {
  id: string;             // Guild/server ID
  appealLink: string;     // Link to the appeal server or page
  memberRole: string;     // Role ID for members
  verifyChannel: string;  // Channel ID used for verification
  [key: string]: any;     // Any additional properties
};

// Extends RawDatabaseData by adding the Firebase database key (document ID)
type DatabaseData = RawDatabaseData & {
  firebaseKey: string;    // Key used to identify this record in Firebase
};

export { RawDatabaseData, DatabaseData };
