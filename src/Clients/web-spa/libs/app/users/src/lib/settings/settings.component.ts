import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import { ThemeService } from '../../../../../shared/theme/src/lib/services/theme.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BehaviorSubjectItem } from '../../../../../shared/storage/src/lib/common/reactive/behavior-subject.item';

@Component({
  selector: 'wlodzimierz-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public sunIcon = faSun;
  public moonIcon = faMoon;
  public currentTheme: BehaviorSubjectItem<string> = new BehaviorSubjectItem<string>(
    ''
  );

  public constructor(
    private titleService: Title,
    private themeService: ThemeService
  ) {
    this.titleService.setTitle('Appearance - Settings');
  }

  public ngOnInit(): void {
    this.currentTheme.value = this.themeService.read()?.name ?? '';
  }

  public updateTheme(id: number): void {
    this.currentTheme.value = this.themeService.update(id).name;
    this.notify();
  }

  // Helpers.

  private notify(): void {
    Swal.fire({
      position: 'bottom-left',
      icon: 'success',
      title: 'Appearance settings saved.',
      showConfirmButton: false,
      timer: 2500,
      backdrop: false
    });
  }
}
