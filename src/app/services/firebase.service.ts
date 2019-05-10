import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firestoreDB: AngularFirestore) {}

  getAvatars(): Observable<any> {
    return this.firestoreDB.collection('/avatar').valueChanges();
  }

  getUser(userKey): Observable<any> {
    return this.firestoreDB.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, user): Promise<any> {
    user.nameToSearch = user.name.toLowerCase();
    return this.firestoreDB.collection('users').doc(userKey).set(user);
  }

  deleteUser(userKey): Promise<any> {
    return this.firestoreDB.collection('users').doc(userKey).delete();
  }

  getUsers(): Observable<any> {
    return this.firestoreDB.collection('users').snapshotChanges();
  }

  searchUsers(searchValue): Observable<any> {
    return this.firestoreDB.collection(
      'users',
      ref => ref.where('nameToSearch', '>=', searchValue)
        .where('nameToSearch', '<=', searchValue + '\uf8ff')
    ).snapshotChanges();
  }

  searchUsersByAge(value): Observable<any> {
    return this.firestoreDB.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar): Promise<any> {
    return this.firestoreDB.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age, 10),
      avatar
    }).catch( error => console.error('Error adding user to Firestore'));
  }
}
