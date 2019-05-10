import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firestoreDB: AngularFirestore) {}

  getAvatars(): Observable<any> {
      return this.firestoreDB.collection('/avatar').valueChanges();
  }

  getUser(userKey): Observable<any> {
    // TODO implement
    return null;
  }

  updateUser(userKey, user): Promise<any> {
    user.nameToSearch = user.name.toLowerCase();
    // TODO implement
    return null;
  }

  deleteUser(userKey): Promise<any> {
    // TODO implement
    return null;
  }

  getUsers(): Observable<any> {
    return this.firestoreDB.collection('users').snapshotChanges();
  }

  searchUsers(searchValue): Observable<any> {
    // TODO implement
    return null;
  }

  searchUsersByAge(value): Observable<any> {
    return this.firestoreDB.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar): Promise<any> {
    // TODO implement
    return null;
  }
}
