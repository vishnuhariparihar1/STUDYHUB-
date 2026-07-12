import unittest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import app


class BackendAuthTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_signup_login_and_entry_pass_flow(self):
        signup_resp = self.client.post('/api/auth/signup', json={
            'name': 'Test User',
            'email': 'test@example.com',
            'password': 'password123',
            'access_code': 'STUDYHUB2026',
            'role': 'student'
        })
        self.assertEqual(signup_resp.status_code, 200)

    def test_signup_without_access_code_is_allowed(self):
        signup_resp = self.client.post('/api/auth/signup', json={
            'name': 'No Access Code User',
            'email': 'noaccess@example.com',
            'password': 'password123',
            'role': 'student'
        })
        self.assertEqual(signup_resp.status_code, 200)

        login_resp = self.client.post('/api/auth/login', json={
            'email': 'test@example.com',
            'password': 'password123'
        })
        self.assertEqual(login_resp.status_code, 200)
        login_data = login_resp.get_json()
        self.assertTrue(login_data['status'] == 'success')
        user_id = login_data['user']['id']

        entry_resp = self.client.post('/api/entry-passes', json={
            'user_id': user_id,
            'pass_type': 'Seat Booking',
            'library_name': 'Central City Library',
            'location': 'Downtown',
            'item_details': 'Seat A1',
            'entry_date': '2026-07-12',
            'duration': '2 Hours',
            'amount': 120,
            'map_query': 'Central City Library'
        })
        self.assertEqual(entry_resp.status_code, 200)

        history_resp = self.client.get(f'/api/users/{user_id}/entry-passes')
        self.assertEqual(history_resp.status_code, 200)
        history_data = history_resp.get_json()
        self.assertGreaterEqual(len(history_data['passes']), 1)


if __name__ == '__main__':
    unittest.main()
