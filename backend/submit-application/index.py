import json
import os
import urllib.request
import urllib.parse

def handler(event: dict, context) -> dict:
    '''Обработка заявки на займ и отправка в Telegram'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        full_name = body.get('fullName', '')
        phone = body.get('phone', '')
        passport = body.get('passport', '')
        amount = body.get('amount', 0)
        days = body.get('days', 0)
        application_id = body.get('applicationId', '')
        
        if not all([full_name, phone, passport, amount, days]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Все поля обязательны'})
            }
        
        interest_rate = 1.5
        total_amount = round(amount + (amount * interest_rate * days / 100))
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if not telegram_token or not chat_id:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Telegram не настроен'})
            }
        
        message = f"""🔥 <b>Новая заявка на займ!</b>

📋 <b>Номер заявки:</b> <code>{application_id}</code>

👤 <b>ФИО:</b> {full_name}
📱 <b>Телефон:</b> {phone}
🆔 <b>Паспорт:</b> {passport}

💰 <b>Сумма займа:</b> {amount:,} ₽
📅 <b>Срок:</b> {days} дней
💵 <b>К возврату:</b> {total_amount:,} ₽
📊 <b>Ставка:</b> {interest_rate}% в день

⚡ <b>Статус:</b> Ожидает обработки"""
        
        url = f'https://api.telegram.org/bot{telegram_token}/sendMessage'
        data = urllib.parse.urlencode({
            'chat_id': chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }).encode('utf-8')
        
        req = urllib.request.Request(url, data=data)
        with urllib.request.urlopen(req, timeout=10) as response:
            response_data = json.loads(response.read().decode('utf-8'))
            
            if not response_data.get('ok'):
                raise Exception('Telegram API error')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'applicationId': application_id
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Ошибка обработки заявки',
                'details': str(e)
            })
        }
