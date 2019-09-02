import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore

exports.addVolunteerToTeam = functions.firestore
    .document('volunteers/{volunteerId}')
    .onCreate(async (snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      if (!newValue) {
        return
      }
      const volunteerResume: any = {}
      volunteerResume.name = newValue.name;
      volunteerResume.profilePictureUrl = newValue.profilePictureUrl;
      volunteerResume.volunteerId = snap.id;
      
      if (newValue.defaultRole) {
        volunteerResume.defaultRole = newValue.defaultRole;
      }
      return db().doc('team/volunteers').update({volunteers: db.FieldValue.arrayUnion(volunteerResume)})
    });

exports.removeVolunteerFromTeam = functions.firestore
    .document('volunteers/{volunteerId}')
    .onDelete(async (snap, context) => {
      const deletedValue = snap.data()

      if (!deletedValue) {
        return
      }
      const teamSnapshot = await db().doc('team/volunteers').get()
      const team = teamSnapshot.data()
      if (!team) {
        return
      }
      let volunteerToDelete = team.volunteers.find((volunteer: any) => volunteer.volunteerId === snap.id)

      if (!volunteerToDelete) {
        return
      }

      return db().doc('team/volunteers').update({volunteers: db.FieldValue.arrayRemove(volunteerToDelete)})
    })
