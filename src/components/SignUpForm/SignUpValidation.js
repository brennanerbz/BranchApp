import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from 'utils/validation';

const signUpValidation = createValidator({
	username: [required, maxLength(25)],
	email: [required, email],
	password: [required]
});
export default memoize(10)(signUpValidation);