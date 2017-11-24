import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-list-card',
    template: `
    <ion-card>
        <ion-item>
            <ion-avatar item-start>
            <img [src]="getAvatarImg(userid)">
            </ion-avatar>
            <h2>User ID # {{ userid }}</h2>
            <p>Status: <span [ngClass]="{ 'text-success': completed }" *ngIf="completed; else waitingBlock">Completed</span>
                <ng-template #waitingBlock> Waiting</ng-template>
            </p>
        </ion-item>
        <ion-card-content [ngStyle]="{ 'text-decoration': checkComplete(completed)  }">
            {{ todo }}
        </ion-card-content>
    </ion-card>
 `,
    styles: ['.text-success { color: #27ae60; }']
})
export class ListCardComponent {

    @Input() userid: number
    @Input() todo: string
    @Input() completed: boolean

    initAvatar: number = 10330

    getAvatarImg(id: number) {
        return "https://jira.lineageos.org/secure/useravatar?size=small&avatarId=" + (this.initAvatar + id)
    }

    checkComplete(completed: boolean) {
        if (completed) {
            return 'line-through'
        }
        return 'none'
    }

}