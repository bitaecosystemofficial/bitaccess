
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { EducationABI } from '@/contracts/abis/EducationABI';
import { BaseContractService } from './BaseContractService';

export class EducationService extends BaseContractService {
  async getEducationContract() {
    return new ethers.Contract(contractAddresses.education, EducationABI, this.signer);
  }

  async enrollInCourse(courseId: string) {
    const contract = await this.getEducationContract();
    const tx = await contract.enrollInCourse(courseId);
    return tx.wait();
  }

  async getCourseStatus(courseId: string, address: string) {
    const contract = await this.getEducationContract();
    return contract.getCourseStatus(courseId, address);
  }
}

export const educationService = new EducationService();
