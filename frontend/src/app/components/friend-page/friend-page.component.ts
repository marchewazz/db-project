import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/authService/auth.service';
import { FriendsService } from 'src/app/services/friendsService/friends.service';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrls: ['./friend-page.component.scss']
})
export class FriendPageComponent implements OnInit {

  userData: any;
  isUserLogged: boolean = false;

  isUserFriend: any;
  isInvitationSend: any;
  isInvitationReceived: any;

  constructor(private route: ActivatedRoute, private router: Router, private fs: FriendsService, private as: AuthService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.fs.getUserData(this.route.snapshot.paramMap.get('id')).subscribe((res: any) => {
        this.userData = JSON.parse(res.userData)
        if (!this.userData.accountID) this.redirect('/')
        this.isUserLogged = this.as.isUserLogged();
        if(this.isUserLogged) {
          this.as.getUserData().subscribe((res: any) => {
            if(JSON.parse(res.userData).accountID === this.userData.accountID) this.redirect('/myprofile')

            if(JSON.parse(res.userData).friends.filter((friend: any) => friend.friendID === this.route.snapshot.paramMap.get('id')).length) this.isUserFriend = true
            else this.isUserFriend = false

            if(this.userData.invitations.filter((invitation: any) => invitation.senderID === JSON.parse(res.userData).accountID).length) this.isInvitationSend = true
            else this.isInvitationSend = false

            if(JSON.parse(res.userData).invitations.filter((invitation: any) => invitation.senderID === this.route.snapshot.paramMap.get('id')).length) this.isInvitationReceived = true
            else this.isInvitationReceived = false
            
            console.log(this.isInvitationSend);
          })
        }
      }
    )}, 250)
  }

  sendInvitation(receiverID: string) {
    this.as.getUserData().subscribe((res: any) => {
      const invitationData = {
        senderID: JSON.parse(res.userData).accountID,
        receiverID: receiverID
      }
      this.fs.sendInvitation(invitationData).subscribe((res: any) => {
        console.log(res);
      })
    }) 
  }

  cancelInvitation(receiverID: string) {
    this.as.getUserData().subscribe((res: any) => {
      const invitationData = {
        senderID: JSON.parse(res.userData).accountID,
        receiverID: receiverID
      }
      this.fs.cancelInvitation(invitationData).subscribe((res: any) => {
        console.log(res);
      })
    }) 
  }

  redirect(path: string){
    this.router.navigate([path]);
  }
}
