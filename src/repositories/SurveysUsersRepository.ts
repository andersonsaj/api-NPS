import { Repository } from 'typeorm';
import SurveyUser from '../models/SurveyUser';

class SurveysUsersRepository extends Repository<SurveyUser> {}

export default SurveysUsersRepository;
