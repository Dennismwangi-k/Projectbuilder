# forms.py

from django import forms




from django import forms

class DynamicForm(forms.Form):
    def __init__(self, *args, data_frame=None, **kwargs):
        super(DynamicForm, self).__init__(*args, **kwargs)

        if data_frame is not None:
            for column in data_frame.columns:
                field_name = column.replace(' ', '_').lower()
                self.fields[field_name] = forms.CharField(label=column, required=False)




from django import forms

class UploadFileForm(forms.Form):
    files = forms.FileField(required=False)


