from flask import render_template, request, abort, json, Response
from settings import app
from googletrans import Translator


@app.route("/")
def index():
    return render_template('index.html',)


@app.route("/translate")
def translate():
    text = request.args.get('text', None)
    lang = request.args.get('lang', 'en')
    if text == '' or text is None:
        return abort(Response(json.dumps({
            'error': 'No text provided'
        }), status=400))
    if lang == '':
        return abort(Response(json.dumps({
            'error': 'No language provided'
        }), status=400))
    try:
        translator = Translator()
        translated = translator.translate(text, dest=lang)
        return {
            'text': translated.text,
        }
    except Exception as e:
        print(e)
        return abort(Response(json.dumps({
            'error': 'Something went wrong',
        }), status=500))
