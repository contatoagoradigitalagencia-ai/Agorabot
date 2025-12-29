import axios from "axios";

/**
 * @author VAMPETA
 * @brief CONFIGURA O AXIOS
*/
export default function configAxios() {
	axios.defaults.validateStatus = () => true;
}