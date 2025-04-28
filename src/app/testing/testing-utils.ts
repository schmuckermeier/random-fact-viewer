import {ComponentFixture} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

export const queryById = (fixture: ComponentFixture<any>, id: string): DebugElement => fixture.debugElement.query(By.css(`#${id}`));
