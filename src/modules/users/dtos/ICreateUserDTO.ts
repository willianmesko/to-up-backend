import ICreateUserAddressDTO from './ICreateUserAddressDTO';

export default interface ICreateUserDTO {
  name: string;
  surname: string;
  sexo: number;
  email: string;
  password: string;
  address?: ICreateUserAddressDTO;
}
