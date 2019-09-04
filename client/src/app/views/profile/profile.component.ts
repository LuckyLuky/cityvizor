import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription, Observable } from 'rxjs';

import { DataService } from 'app/services/data.service';
import { ToastService } from 'app/services/toast.service';

import { AppConfig, IAppConfig, Module } from 'config/config';
import { ProfileService } from 'app/services/profile.service';
import { Profile } from 'app/schema/profile';
import { TitleService } from 'app/services/title.service';

@Component({
	moduleId: module.id,
	selector: 'profile',
	templateUrl: 'profile.component.html',
	styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

	profile: Observable<Profile>;

	paramsSubscription: Subscription;

	constructor(
		private profileService: ProfileService,
		private titleService: TitleService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.paramsSubscription = this.route.params.subscribe((params: Params) => {
			this.profileService.setProfile(params["profile"]);
		});

		this.profile = this.profileService.profile;

		this.profile.subscribe(profile => {
			this.titleService.setTitle(profile.name)
		});
	}

	ngOnDestroy() {
		this.paramsSubscription.unsubscribe();
		this.titleService.setTitle(null);
	}

}