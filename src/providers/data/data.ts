import { Storage } from '@ionic/storage/dist/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {

  constructor(private storage: Storage) {

  }
  getData(): Promise<any>{
    return this.storage.get('ionic-snapaday');
  }

  save(data){
    let newData = JSON.stringify(data);
    this.storage.set('ionic-snapaday', newData);
  }

}
