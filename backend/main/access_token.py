"
from supertokens_fastapi.jwt import get_payload
from supertokens_fastapi.utils import sanitize_number, sanitize_string, get_timestamp_ms
from supertokens_fastapi.exceptions import raise_try_refresh_token_exception


def get_info_from_access_token(token, jwt_signing_public_key, do_anti_csrf_check):
    try:
        payload = get_payload(token, jwt_signing_public_key)
        session_handle = sanitize_string(payload.get('sessionHandle'))
        user_id = sanitize_string(payload.get('userId'))
        refresh_token_hash_1 = sanitize_string(
            payload.get('refreshTokenHash1'))
        parent_refresh_token_hash_1 = sanitize_string(
            payload.get('parentRefreshTokenHash1'))
        user_data = payload.get('userData')
        anti_csrf_token = sanitize_string(payload.get('antiCsrfToken'))
        expiry_time = sanitize_number(payload.get('expiryTime'))
        time_created = sanitize_number(payload.get('timeCreated'))

        if (session_handle is None) or \
                (user_data is None) or \
                (refresh_token_hash_1 is None) or \
                (user_data is None) or \
                (anti_csrf_token is None and do_anti_csrf_check) or \
                (expiry_time is None) or \
                (time_created is None):
            raise Exception(
                'Access token does not contain all the information. Maybe the structure has changed?')

        if expiry_time < get_timestamp_ms():
            raise Exception('Access token expired')

        return {
            'sessionHandle': session_handle,
            'userId': user_id,
            'refreshTokenHash1': refresh_token_hash_1,
            'parentRefreshTokenHash1': parent_refresh_token_hash_1,
            'userData': user_data,
            'antiCsrfToken': anti_csrf_token,
            'expiryTime': expiry_time,
            'timeCreated': time_created
        }
    except Exception as e:
        raise_try_refresh_token_exception(e)
