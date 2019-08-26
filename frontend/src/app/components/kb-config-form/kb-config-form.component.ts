import { IProviderConfigData } from './../../models/IProviderConfigData';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'kb-config-form',
  templateUrl: './kb-config-form.component.html',
  styleUrls: ['./kb-config-form.component.css']
})
export class KbConfigFormComponent implements OnInit {
  @Input() providerConfig: IProviderConfigData;
  ngOnChanges(changes: SimpleChanges) {
    if (this.profileForm && this.profileForm.value) {
      this.profileForm.setValue({
        providerCode: changes['providerConfig'].currentValue.providerCode,
        siteURL: changes['providerConfig'].currentValue.siteURL,
        user: JSON.parse(changes['providerConfig'].currentValue.siteCredential).user,
        key: JSON.parse(changes['providerConfig'].currentValue.siteCredential).key,
        secret: JSON.parse(changes['providerConfig'].currentValue.siteCredential).secret,
      });
    }
  }
  public profileForm;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      providerCode: [this.providerConfig.providerCode],
      siteURL: [this.providerConfig.siteURL],
      user: [JSON.parse(this.providerConfig.siteCredential).user],
      key: [JSON.parse(this.providerConfig.siteCredential).key],
      secret: [JSON.parse(this.providerConfig.siteCredential).secret],
    });
  };

  getCurrentProviderConfig() {
    return this.profileForm.value;
  };

}
