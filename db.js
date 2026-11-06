let db;
export async function openDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open('pellet-inspections',1);r.onupgradeneeded=()=>r.result.createObjectStore('inspections',{keyPath:'id'});r.onsuccess=()=>{db=r.result;resolve(db)};r.onerror=()=>reject(r.error);r.onblocked=()=>reject(new Error('Close other Pellet tabs and try again.'));});}
function tx(mode,action){return new Promise((resolve,reject)=>{const t=db.transaction('inspections',mode);let result;const r=action(t.objectStore('inspections'));r.onsuccess=()=>result=r.result;t.oncomplete=()=>resolve(result);t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error||new Error('Save was interrupted'));});}
export const all=()=>tx('readonly',s=>s.getAll());
export const get=id=>tx('readonly',s=>s.get(id));
export const put=record=>tx('readwrite',s=>s.put(record));
