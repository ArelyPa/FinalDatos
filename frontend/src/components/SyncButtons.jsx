import React from 'react';

export const SyncButtons = ({ onSyncPGtoMongo, onSyncMongoToPG }) => {

  return (

    <div className="sync-container">

      {/* TARJETA POSTGRES → MONGO */}
      <div className="sync-card postgres-card">

        <h3>PostgreSQL → MongoDB</h3>

        <button className="btn" onClick={onSyncPGtoMongo}>
          Sincronizar
        </button>

      </div>


      {/* TARJETA MONGO → POSTGRES */}
      <div className="sync-card mongo-card">

        <h3>MongoDB → PostgreSQL</h3>

        <button className="btn" onClick={onSyncMongoToPG}>
          Sincronizar
        </button>

      </div>

    </div>

  );
};
