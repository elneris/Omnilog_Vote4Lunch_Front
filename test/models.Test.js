import { expect } from 'chai';

import {PlaceModel} from '../models/place'
import {VoiceModel} from '../models/voice'
import {VoteModel} from '../models/vote'

describe('models/index', function () {
  it('returns the place model', function () {
    expect(PlaceModel).to.be.ok;
  });

  it('returns the voice model', function () {
    expect(VoiceModel).to.be.ok;
  });

  it('returns the vote model', function () {
    expect(VoteModel).to.be.ok;
  });
});