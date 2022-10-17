import { AnimeService } from './services/anime.service';
import * as AnimeActions from './actions/anime.actions';
import { Filter } from './models';
import * as fromAnime from './selectors/anime.selectors';

export { AnimeActions, AnimeService, fromAnime, Filter };

