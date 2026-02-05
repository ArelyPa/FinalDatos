import React from 'react';

export const SyncButtons = ({ onSyncPGtoMongo, onSyncMongoToPG }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={onSyncPGtoMongo}>Sincronizar PostgreSQL → MongoDB</button>
      <button onClick={onSyncMongoToPG}>Sincronizar MongoDB → PostgreSQL</button>
    </div>
  );
};
