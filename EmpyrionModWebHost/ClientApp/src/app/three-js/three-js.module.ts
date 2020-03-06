import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrbitControlsDirective } from './controls/orbit-controls.directive';
import { ColladaLoaderDirective } from './objects/loaders/collada-loader.directive';
import { ObjLoaderDirective } from './objects/loaders/obj-loader.directive';
import { Rad2DegPipe } from './pipes/rad2deg.pipe';
import { Deg2RadPipe } from './pipes/deg2rad.pipe';
import { PerspectiveCameraDirective } from './cameras/perspective-camera.directive';
import { WebGLRendererComponent } from './renderer/webgl-renderer.component';
import { SceneDirective } from './objects/scene.directive';
import { AxesHelperDirective } from './objects/helpers/axes-helper.directive';
import { GridHelperDirective } from './objects/helpers/grid-helper.directive';
import { ObjectLoaderDirective } from './objects/loaders/object-loader.directive';
import { PointLightDirective } from './objects/light/point-light.directive';
import { TextLoaderDirective } from './objects/loaders/text-loader.directive';
import { LineLoaderDirective } from './objects/line-object.directive';
import { ConeLoaderDirective } from './objects/cone-object.directive';
import { OrthographicCameraDirective } from './cameras/orthographic-camera.directive';

// TODO: Ideally move all to three-wrapper library. But can't move js/EnableThreeExamples.js to library :(
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OrbitControlsDirective,
    ColladaLoaderDirective,
    ObjLoaderDirective,
    Rad2DegPipe,
    Deg2RadPipe,
    PerspectiveCameraDirective,
    OrthographicCameraDirective,
    WebGLRendererComponent,
    SceneDirective,
    AxesHelperDirective,
    GridHelperDirective,
    ObjectLoaderDirective,
    TextLoaderDirective,
    PointLightDirective,
    LineLoaderDirective,
    ConeLoaderDirective,
  ],
  exports: [
    OrbitControlsDirective,
    ColladaLoaderDirective,
    ObjLoaderDirective,
    Rad2DegPipe,
    Deg2RadPipe,
    PerspectiveCameraDirective,
    OrthographicCameraDirective,
    WebGLRendererComponent,
    SceneDirective,
    AxesHelperDirective,
    GridHelperDirective,
    ObjectLoaderDirective,
    TextLoaderDirective,
    PointLightDirective,
    LineLoaderDirective,
    ConeLoaderDirective,
  ]
})
export class ThreeJsModule { }
