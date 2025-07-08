type RawDatabaseData = {
  id: string;
  appealLink: string;
  memberRole: string;
  verifyChannel: string;
  [key: string]: any;
};

type DatabaseData = RawDatabaseData & {
  firebaseKey: string;
};

export { RawDatabaseData, DatabaseData }