import { useState } from "react";
import { getContacts } from "../api/contactsApi";
import { syncUsersToContacts } from "../api/syncApi";

function SyncButton({ setContacts }) {
  const [syncResult, setSyncResult] = useState({});
  const [resultOpen, setResultOpen] = useState(false);

  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError("");

      const sync = await syncUsersToContacts();

      setSyncResult(sync);

      const updatedContacts = await getContacts();
      setContacts(updatedContacts);

      setResultOpen(true);
    } catch (err) {
      console.error(err);
      setError("Sync failed. Please try again");
    } finally {
      setSyncing(false);
    }
  };
  return (
    <div>
      <button onClick={handleSync} disabled={syncing}>
        {syncing ? "Syncing..." : "Sync 10 Contacts"}
      </button>

      {error && <p>{error}</p>}

      {resultOpen && (
        <div>
          <p>Received: {syncResult.received}</p>
          <p>Imported: {syncResult.imported}</p>
          <p>Rejected: {syncResult.rejected}</p>
        </div>
      )}
    </div>
  );
}

export default SyncButton;
