/* Copyright 2015 Bloomberg Finance L.P.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MarkModel } from './MarkModel';
import * as serialize from './serialize';

export class ScatterGLModel extends MarkModel {
  defaults() {
    return {
      ...MarkModel.prototype.defaults(),
      _model_name: 'ScatterGLModel',
      _view_name: 'ScatterGL',
      x: [],
      y: [],
      color: null,
      skew: null,
      marker: 'circle',
      stroke: null,
      stroke_width: 1.5,
      default_skew: 0.5,
      default_size: 64,
      names: [],
      display_names: true,
      fill: true,
      drag_color: null,
      drag_size: 5.0,
      names_unique: true,
    };
  }

  initialize(attributes, options) {
    super.initialize(attributes, options);
    this.update_domains();
  }

  update_domains() {
    // color scale needs an issue in DateScaleModel to be fixed. It
    // should be moved here as soon as that is fixed.
    const scales = this.getScales();
    for (const key in scales) {
      if (scales.hasOwnProperty(key) && key != 'color') {
        const scale = scales[key];
        if (!this.get('preserve_domain')[key]) {
          scale.computeAndSetDomain(this.get(key), this.model_id + key);
        } else {
          scale.delDomain([], this.model_id + key);
        }
      }
    }
  }

  static serializers = {
    ...MarkModel.serializers,
    x: serialize.array_or_json_serializer,
    y: serialize.array_or_json_serializer,
    color: serialize.array_or_json_serializer,
    size: serialize.array_or_json_serializer,
    rotation: serialize.array_or_json_serializer,
    opacity: serialize.array_or_json_serializer,
    opacities: serialize.array_or_json_serializer,
  };
}
