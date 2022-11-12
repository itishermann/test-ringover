// Generate api client class from api-spec.yml

/**
 * Task
 * @typedef {Object} Task
 * @property {string} label - Task label (required) also used as task id
 * @property {string} description - Task description
 * @property {string} start_date - Task start date
 * @property {string} end_date - Task end date (not required)
 */

class TaskApi {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:9000';
  }

  /**
   * @returns {Task[]} - List of tasks
   */
  async getAllTasks() {
    const response = await fetch(`${this.baseUrl}/v1/tasks`);
    return await response.json();
  }

  /**
   * 
   * @param {Task} task - Task to create
   */
  async createTask(task) {
    const response = await fetch(`${this.baseUrl}/v1/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.status;
  }

  /**
   * 
   * @param {string} label 
   * @returns {Task} - Updated task
   */
  async getTask(label) {
    const response = await fetch(`${this.baseUrl}/v1/tasks/${label}`);
    return await response.json();
  }

  /**
   * 
   * @param {string} label 
   * @param {string} end_date - Task end date
   */
  async updateTask(label, end_date) {
    const response = await fetch(`${this.baseUrl}/v1/tasks/${label}`, {
      method: 'PUT',
      body: JSON.stringify({ end_date }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.status;
  }

  /**
   * 
   * @param {string} label 
   */
  async deleteTask(label) {
    const response = await fetch(`${this.baseUrl}/v1/tasks/${label}`, {
      method: 'DELETE'
    });
    return await response.status;
  }
}

export default new TaskApi();